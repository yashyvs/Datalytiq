def generate_summary(df):

    numeric_summary={}

    try:

        numeric_summary=(
            df.describe()
            .fillna("")
            .to_dict()
        )

    except:

        pass


    return{

        "rows":int(df.shape[0]),

        "columns":int(df.shape[1]),

        "column_names":
        list(df.columns),

        "data_types":
        df.dtypes.astype(
            str
        ).to_dict(),

        "missing_values":
        df.isnull()
        .sum()
        .to_dict(),

        "duplicate_rows":
        int(
            df.duplicated()
            .sum()
        ),

        "preview":
        df.head(5)
        .fillna("")
        .to_dict(
            orient="records"
        ),

        "statistics":
        numeric_summary
    }