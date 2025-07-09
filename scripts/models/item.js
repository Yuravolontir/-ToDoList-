export class Item
{
    id; //מספר זיהוי של כל משימה
    title; //כותרת המשימה
    description; //תיאור המשימה
    dueDate; //תאריך יעד
    createdAt; //תאריך יצירה
    priority; //עדיפות
    status; //סטטוס המשימה (הושלמה/לא הושלמה)

    constructor(title, description, dueDate, priority)
    {
        this.id = new Date().getTime(); // מספר זיהוי ייחודי לכל משימה - כמות המילישניות מאז 1970
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.createdAt = new Date(); // תאריך יצירה הוא התאריך הנוכחי
        this.priority = priority;
        this.status = false; // ברירת מחדל היא לא הושלמה
    }
}