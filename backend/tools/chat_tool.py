from ai.chat_model import llm
import state


def ask_data(question):

    df=state.current_df


    if df is None:

        return "No file uploaded"


    columns=", ".join(
        df.columns.tolist()
    )


    preview=df.head(5).to_string()


    prompt=f"""

You are a data analyst.

Dataset columns:

{columns}


Dataset preview:

{preview}


User question:

{question}


Answer based on dataset.

"""


    response = llm.invoke(
    prompt
)

    return response.content