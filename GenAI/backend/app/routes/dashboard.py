# routes/dashboard.py

@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db)
):

    total_users = db.query(User).count()

    total_documents = db.query(
        Document
    ).count()

    total_queries = db.query(
        ChatHistory
    ).count()

    return {
        "users": total_users,
        "documents": total_documents,
        "queries": total_queries
    }