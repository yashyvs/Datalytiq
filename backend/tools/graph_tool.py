import json
import re
import plotly.express as px

from ai.chat_model import llm


def generate_graph(df):

    sample_df = df.head(30)

    columns = sample_df.columns.tolist()

    preview = sample_df.head(5).to_string()


    prompt = f"""
You are a data visualization expert.

Dataset columns:
{columns}

Dataset preview:
{preview}

Suggest maximum 4 useful graph ideas.

Return ONLY JSON.

Example:

[
  {{
    "type":"bar",
    "x":"Industry",
    "y":"Revenue"
  }},
  {{
    "type":"histogram",
    "x":"Salary"
  }}
]

No markdown.
No explanation.
"""


    try:

        response = llm.invoke(prompt)

        content = response.content


        content = re.sub(
            r"```json|```",
            "",
            content
        ).strip()


        recommendations = json.loads(
            content
        )


    except Exception as e:

        print("Graph error:", e)

        recommendations = []


    graphs = []


    for rec in recommendations:

        try:

            chart_type = rec.get(
                "type"
            )

            x = rec.get(
                "x"
            )

            y = rec.get(
                "y"
            )


            if x not in sample_df.columns:
                continue


            if (
                y
                and
                y not in sample_df.columns
            ):
                continue


            if chart_type == "bar":

                fig = px.bar(
                    sample_df,
                    x=x,
                    y=y
                )


            elif chart_type == "scatter":

                fig = px.scatter(
                    sample_df,
                    x=x,
                    y=y
                )


            elif chart_type == "histogram":

                fig = px.histogram(
                    sample_df,
                    x=x
                )


            elif chart_type == "pie":

                vals = (
                    sample_df[x]
                    .value_counts()
                    .head(5)
                )

                fig = px.pie(
                    values=vals.values,
                    names=vals.index
                )

            else:

                continue


            graphs.append(
                fig.to_json()
            )

        except:
            pass


    return graphs