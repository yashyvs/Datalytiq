import json
import re
import logging
import plotly.express as px
from ai.chat_model import llm

logger = logging.getLogger(__name__)


def generate_graph(df):

    columns = df.columns.tolist()
    preview = df.head(5).to_string()
    dtypes = df.dtypes.astype(str).to_dict()

    prompt = f"""You are a data visualization expert.

Dataset columns with types: {dtypes}

Dataset preview:
{preview}

Suggest maximum 4 useful graph ideas for this dataset.

Return ONLY a JSON array. No markdown, no explanation.

Example:
[
  {{"type":"bar","x":"Industry","y":"Revenue"}},
  {{"type":"histogram","x":"Salary"}},
  {{"type":"scatter","x":"Age","y":"Income"}},
  {{"type":"pie","x":"Category"}}
]
"""

    try:
        response = llm.invoke(prompt)
        content = response.content
        content = re.sub(r"```json|```", "", content).strip()
        recommendations = json.loads(content)
    except Exception as e:
        logger.error(f"LLM graph recommendation failed: {e}")
        recommendations = []

    graphs = []

    for rec in recommendations:
        try:
            chart_type = rec.get("type")
            x = rec.get("x")
            y = rec.get("y")

            # Validate columns exist
            if x not in df.columns:
                logger.warning(f"Column '{x}' not found in dataframe, skipping.")
                continue
            if y and y not in df.columns:
                logger.warning(f"Column '{y}' not found in dataframe, skipping.")
                continue

            fig = None

            if chart_type == "bar":
                if y:
                    # Aggregate over full dataset instead of just 30 rows
                    agg_df = (
                        df.groupby(x)[y]
                        .mean()
                        .reset_index()
                        .sort_values(y, ascending=False)
                        .head(20)
                    )
                    fig = px.bar(agg_df, x=x, y=y)
                else:
                    counts = df[x].value_counts().head(20).reset_index()
                    counts.columns = [x, "count"]
                    fig = px.bar(counts, x=x, y="count")

            elif chart_type == "scatter":
                # Sample for scatter to avoid huge payloads
                sample = df[[x, y]].dropna().sample(
                    min(300, len(df)), random_state=42
                )
                fig = px.scatter(sample, x=x, y=y)

            elif chart_type == "histogram":
                fig = px.histogram(df, x=x)

            elif chart_type == "pie":
                vals = df[x].value_counts().head(8)
                fig = px.pie(values=vals.values, names=vals.index)

            else:
                logger.warning(f"Unknown chart type '{chart_type}', skipping.")
                continue

            if fig:
                graphs.append(fig.to_json())

        except Exception as e:
            logger.error(f"Failed to generate chart {rec}: {e}")
            continue

    return graphs