from ai.chat_model import llm
import state


def ask_data(session_id: str, question: str) -> str:

    session = state.sessions.get(session_id)
    if not session:
        return "Session not found. Please upload a file first."

    df = session["df"]
    history = session["history"]

    # --- Build rich data context for the LLM ---
    columns = ", ".join(df.columns.tolist())
    preview = df.head(5).to_string()

    try:
        stats = df.describe(include="all").fillna("N/A").to_string()
    except Exception:
        stats = "Could not compute statistics."

    # --- Include last 3 Q&A pairs for conversation memory ---
    history_text = ""
    for turn in history[-3:]:
        history_text += f"User: {turn['question']}\nAssistant: {turn['answer']}\n\n"

    prompt = f"""You are a data analyst assistant. Answer the user's question based only on the dataset provided.

Dataset columns: {columns}

Sample rows (first 5):
{preview}

Dataset statistics:
{stats}

{"Previous conversation:" + chr(10) + history_text if history_text else ""}
User question: {question}

Answer concisely and accurately based on the dataset above.
"""

    response = llm.invoke(prompt)
    answer = response.content

    # Save this turn to history
    session["history"].append({
        "question": question,
        "answer": answer,
    })

    return answer