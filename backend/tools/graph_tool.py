import plotly.express as px
import pandas as pd


def generate_graph(df):

    numeric_cols = list(
        df.select_dtypes(
            include=["int64","float64"]
        ).columns
    )

    categorical_cols = list(
        df.select_dtypes(
            include=["object"]
        ).columns
    )


    if len(categorical_cols)>=1 and len(numeric_cols)>=1:

        fig=px.bar(

            df,

            x=categorical_cols[0],

            y=numeric_cols[0],

            title=f"{numeric_cols[0]} by {categorical_cols[0]}"
        )

    elif len(numeric_cols)>=2:

        fig=px.scatter(

            df,

            x=numeric_cols[0],

            y=numeric_cols[1]
        )

    else:

        return None


    return fig.to_json()