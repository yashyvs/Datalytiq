from ai.chat_model import llm


def generate_summary(df):
    numeric_summary = {}

    try:
        numeric_summary = (
            df.describe(include="all")
            .fillna("")
            .to_dict()
        )

    except Exception as e:
        print("Statistics Error:", e)

    # ---------- AI Dataset Description ----------

    try:
        columns = list(df.columns)

        data_types = (
            df.dtypes.astype(str)
            .to_dict()
        )

        preview = (
            df.head(3)
            .fillna("")
            .to_dict(
                orient="records"
            )
        )

        prompt = f"""
You are an expert data analyst.

Dataset Columns:
{columns}

Data Types:
{data_types}

Sample Records:
{preview}

Your task:

1. Explain what this dataset is about.
2. Identify the business/domain.
3. Mention 2-3 possible use cases.
4. Keep the answer under 80 words.
5. Return only plain text.
"""

        response = llm.invoke(prompt)

        dataset_description = (
            response.content.strip()
        )

    except Exception as e:
        print("Dataset Description Error:", e)

        dataset_description = (
            "Unable to generate dataset description."
        )

    return {
        "dataset_description": dataset_description,

        "rows": int(df.shape[0]),

        "columns": int(df.shape[1]),

        "column_names": list(df.columns),

        "data_types": (
            df.dtypes.astype(str)
            .to_dict()
        ),

        "missing_values": (
            df.isnull()
            .sum()
            .to_dict()
        ),

        "duplicate_rows": int(
            df.duplicated().sum()
        ),

        "preview": (
            df.head(5)
            .fillna("")
            .to_dict(
                orient="records"
            )
        ),

        "statistics": numeric_summary,
    }