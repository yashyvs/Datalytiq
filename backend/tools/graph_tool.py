import plotly.express as px
import pandas as pd


def generate_graph(df):

    graphs = []

    sample_df = df.head(50)

    numeric_cols = list(
        sample_df.select_dtypes(
            include=[
                'int64',
                'float64'
            ]
        ).columns
    )

    categorical_cols = list(
        sample_df.select_dtypes(
            include=[
                'object'
            ]
        ).columns
    )


    numeric_cols = [

        col

        for col in numeric_cols

        if sample_df[col].notna().sum() > 5

    ]


    categorical_cols = [

        col

        for col in categorical_cols

        if sample_df[col].notna().sum() > 5

    ]


    try:

        # Bar chart

        if (
            len(categorical_cols) >= 1
            and len(numeric_cols) >= 1
        ):

            fig = px.bar(

                sample_df,

                x=categorical_cols[0],

                y=numeric_cols[0],

                title=
                f"{numeric_cols[0]} by {categorical_cols[0]}"

            )

            graphs.append(
                fig.to_json()
            )


        # Scatter

        if len(numeric_cols) >= 2:

            fig = px.scatter(

                sample_df,

                x=numeric_cols[0],

                y=numeric_cols[1],

                title=
                f"{numeric_cols[0]} vs {numeric_cols[1]}"

            )

            graphs.append(
                fig.to_json()
            )


        # Histogram

        if len(numeric_cols) >= 1:

            fig = px.histogram(

                sample_df,

                x=numeric_cols[0],

                title=
                f"{numeric_cols[0]} Distribution"

            )

            graphs.append(
                fig.to_json()
            )


        # Pie

        if len(categorical_cols) >= 1:

            top_data = (
                sample_df[
                    categorical_cols[0]
                ]
                .value_counts()
                .head(5)
            )


            fig = px.pie(

                values=
                top_data.values,

                names=
                top_data.index,

                title=
                f"Top {categorical_cols[0]}"

            )

            graphs.append(
                fig.to_json()
            )

    except:
        pass


    return graphs[:4]