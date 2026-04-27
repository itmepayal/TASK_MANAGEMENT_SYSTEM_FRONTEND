import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { TaskTable } from "../tasks/TaskTable";
import { TaskModal } from "../modals/TaskModal";
import { DeleteTaskModal } from "../modals/DeleteTaskModal";

/**
 * =========================================================
 * TASK PAGE COMPONENT
 * Responsible for:
 * - Layout (Header, Footer)
 * - Displaying task list
 * - Connecting UI with controller logic
 * - Managing modals (create/edit/delete)
 * =========================================================
 */
export const TaskPage = ({ controller }: any) => {
  return (
    /**
     * =========================================================
     * PAGE LAYOUT WRAPPER
     * =========================================================
     */
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* ================= HEADER ================= */}
      <Header />

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 py-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* ================= PAGE TITLE + ACTION ================= */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Tasks</h2>

            {/* Open Create Task Modal */}
            <button
              onClick={() => controller.setShowModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              + New Task
            </button>
          </div>

          {/* ================= TASK TABLE ================= */}
          <TaskTable
            tasks={controller.tasks} // task list
            loading={controller.loading} // loading state
            currentPage={controller.currentPage} // current page
            pagination={controller.pagination} // pagination info
            setCurrentPage={controller.setCurrentPage} // page change handler
            onEdit={controller.handleEdit} // edit action
            onDelete={controller.handleDelete} // delete action
            onToggle={controller.handleToggle} // toggle complete
          />
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />

      {/* ================= CREATE / EDIT MODAL ================= */}
      <TaskModal
        open={controller.showModal} // modal visibility
        isEdit={controller.isEdit} // edit mode flag
        formData={controller.formData} // form state
        loading={controller.submitLoading} // submit loading
        onClose={controller.resetForm} // close + reset
        onSubmit={controller.handleSubmit} // create/update handler
        onChange={controller.handleChange} // input handler
      />

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      <DeleteTaskModal
        open={controller.showDeleteModal} // modal visibility
        loading={controller.deleteLoading} // delete loading
        onCancel={() => controller.setShowDeleteModal(false)} // cancel action
        onConfirm={controller.confirmDelete} // confirm delete
        task={controller.selectedTask} // selected task
      />
    </div>
  );
};
