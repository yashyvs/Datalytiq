def generate_summary(df):

    return{

        "rows":df.shape[0],

        "columns":df.shape[1],

        "column_names":
        list(df.columns),

        "data_types":
        df.dtypes.astype(
            str
        ).to_dict()

    }