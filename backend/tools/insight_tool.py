def generate_insights(df):

    insights=[]


    rows,cols=df.shape


    insights.append(
        f"{rows} rows and {cols} columns detected"
    )


    missing=df.isnull().sum()

    high_missing=missing[missing>0]


    if len(high_missing)>0:

        top=high_missing.idxmax()

        count=int(
            high_missing.max()
        )

        insights.append(

        f"{top} contains {count} missing values"

        )


    duplicates=int(

    df.duplicated().sum()

    )


    if duplicates:

        insights.append(

        f"{duplicates} duplicate rows found"

        )


    numeric_count=len(

    df.select_dtypes(

    include=["int64","float64"]

    ).columns

    )


    insights.append(

    f"{numeric_count} numeric columns detected"

    )


    cols_lower=" ".join(map(str.lower,df.columns))


    if("email" in cols_lower or "company" in cols_lower):

        insights.append(
        "Lead dataset detected"
        )


    return insights