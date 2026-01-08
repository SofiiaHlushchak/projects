import { useState } from "react";
import NewProject from "./components/NewProject/NewProject";
import NoProjectSelected from "./components/NoProjectSelected/NoProjectSelected";
import Sidebar from "./components/Sidebar/Sidebar";
import { SelectedProject } from "./components/SelectedProject/SelectedProject";

function App() {
    const [projectsState, setProjectsState] = useState({
        selecterProjectId: undefined,
        projects: [],
        tasks: [],
    });

    const handleStartAddProject = () => {
        setProjectsState((prev) => ({
            ...prev,
            selecterProjectId: null,
        }));
    };

    const handleAddProject = (projectData) => {
        const newProject = { ...projectData, id: Math.random() };

        setProjectsState((prev) => ({
            ...prev,
            projects: [...prev.projects, newProject],
            selecterProjectId: undefined,
        }));
    };

    const handleCancelProject = () => {
        setProjectsState((prev) => ({
            ...prev,
            selecterProjectId: undefined,
        }));
    };

    const handleSelectedProject = (id) => {
        setProjectsState((prev) => ({
            ...prev,
            selecterProjectId: id,
        }));
    };

    const handleRemoveProject = () => {
        setProjectsState((prev) => ({
            ...prev,
            selecterProjectId: undefined,
            projects: prev.projects.filter(
                (project) => project.id !== prev.selecterProjectId
            ),
        }));
    };

    const handleAddTask = (text) => {
        const newTask = {
            text: text,
            id: Math.random(),
            projectId: projectsState.selecterProjectId,
        };

        setProjectsState((prev) => ({
            ...prev,
            tasks: [newTask, ...prev.tasks],
        }));
    };

    const handleDeleteTask = (id) => {
        setProjectsState((prev) => ({
            ...prev,
            tasks: prev.tasks.filter((task) => task.id !== id),
        }));
    };

    let content = (
        <SelectedProject
            project={projectsState.projects.find(
                (project) => project.id === projectsState.selecterProjectId
            )}
            onDelete={handleRemoveProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            tasks={projectsState.tasks.filter(
                (task) => task.projectId === projectsState.selecterProjectId
            )}
        />
    );

    if (projectsState.selecterProjectId === null) {
        content = (
            <NewProject
                onAddProject={handleAddProject}
                onCancelProject={handleCancelProject}
            />
        );
    } else if (projectsState.selecterProjectId === undefined) {
        content = (
            <NoProjectSelected onStartAddProject={handleStartAddProject} />
        );
    }
    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                onStartAddProject={handleStartAddProject}
                projects={projectsState.projects}
                selectedProjectId={projectsState.selecterProjectId}
                onSelectedProject={handleSelectedProject}
            />
            {content}
        </main>
    );
}

export default App;
