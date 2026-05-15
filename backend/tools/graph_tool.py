import plotly.express as px
import pandas as pd


def generate_graph(df):

    sample_df = df.head(30)

    numeric_cols = list(
        sample_df.select_dtypes(
            include=["int64", "float64"]
        ).columns
    )

    categorical_cols = list(
        sample_df.select_dtypes(
            include=["object"]
        ).columns
    )


    # Remove mostly empty columns

    numeric_cols = [

        col for col in numeric_cols

        if sample_df[col].notna().sum() > 5

    ]



    categorical_cols = [

        col for col in categorical_cols

        if sample_df[col].notna().sum() > 5

    ]


    if len(numeric_cols)==0:

        return None


    y_col=numeric_cols[0]


    # Prefer company/title over names

    preferred=[

        "Company Name",
        "Title",
        "Industry",
        "Country"

    ]


    x_col=None


    for col in preferred:

        if col in sample_df.columns:

            x_col=col

            break


    if x_col is None and categorical_cols:

        x_col=categorical_cols[0]


    fig=px.bar(

        sample_df,

        x=x_col,

        y=y_col,

        title=f"{y_col} by {x_col}"

    )


    return fig.to_json()