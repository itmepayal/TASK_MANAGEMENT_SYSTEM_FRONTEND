# 🚀 Task Management System

A modern and responsive **Task Management System** built using React. This application allows users to efficiently manage their daily tasks with features like creating, updating, deleting, and tracking task progress.

---

## 📌 Features

- ✅ Create new tasks
- 📝 Edit existing tasks
- ❌ Delete tasks
- 🔄 Toggle task completion status
- 📊 Task prioritization (Low / Medium / High)
- 📄 Pagination support
- ⚡ Real-time UI updates
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** Custom Hooks
- **API Handling:** Fetch / Axios

---

## 📂 Project Structure

```
src/
│── components/
│   ├── layout/
│   ├── tasks/
│   ├── modals/
│
│── hooks/
│   ├── useTasks.ts
│   ├── useTaskActions.ts
│   ├── useTaskController.ts
│
│── types/
│   ├── task.ts
│
│── App.tsx
│── main.tsx
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/itmepayal/TASK_MANAGEMENT_SYSTEM_FRONTEND.git
```

### 2️⃣ Navigate to project

```bash
cd task-manager-frontend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run development server

```bash
npm run dev
```

App will run on:

```
http://localhost:5173
```

---

## 🔗 API Integration

Make sure backend is running.

Update API base URL if needed:

```ts
const API_URL = "http://localhost:8000/api";
```

---

## 🧠 Core Concepts Used

- Custom React Hooks for separation of logic
- Controlled components for form handling
- Component-based architecture
- Pagination & state synchronization
- Reusable UI components

---

## 📸 Screenshots

> ![alt text](<Screenshot from 2026-04-27 21-36-06.png>)

---

## 📈 Future Improvements

- 🔐 Authentication (Login/Register)
- 🌐 Deployment (Vercel / Netlify)
- 🔔 Notifications
- 📅 Task scheduling with calendar
- 🌙 Dark mode

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Payal Yadav**

- GitHub: https://github.com/itmepayal

---

⭐ If you like this project, don't forget to give it a star!
