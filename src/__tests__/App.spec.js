/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable-next-line testing-library/render-result-naming-convention */
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import Task from "../components/Task"
import CreateTask from "../components/CreateTask"

describe("Rendering App", () => {
    it("renders without crashing", () => {
        const { getByTestId} = render(<App />);
        
        const app = getByTestId("app");
        expect(app).toBeDefined();
    });
});


describe("todo functionalities", () => {
    // Complete task status
    it("should complete task status", () => {
        const mockcompleteTask = jest.fn().mockName("completeTask");
        const mockTask={completed: true, id: 714, title: "Sleep"};
        const index=1;
        const { getByTestId } = render(
            <Task
                task={mockTask}
                index={index}
                completeTask={mockcompleteTask}
            />
        );
        
        fireEvent.click(getByTestId("todo-Sleep"));
        expect(mockcompleteTask).toHaveBeenCalled();
        
        expect(mockcompleteTask).toHaveBeenCalledWith(index);
    });

    it('Renders with a className equal to the completed', () => {
        const mockcompleteTask = jest.fn().mockName("completeTask");
        const mockTask={completed: true, id: 714, title: "Sleep"};
        const index=1;
        const { container } = render(
            <Task
                task={mockTask}
                index={index}
                completeTask={mockcompleteTask}
            />
        );
        expect(container.getElementsByClassName('completed').length).toBe(1);
    });

    it("adds new task", () => {
        const mockaddTask = jest.fn().mockName("addTask");
        const { getByTestId } = render(<CreateTask addTask={mockaddTask}/>);
       
        userEvent.type(getByTestId("todo-add"), "Code");
        fireEvent.click(getByTestId("todo-add-submit"));
        expect(getByTestId("todo-add").value).toEqual("");
       
        expect(mockaddTask).toHaveBeenCalled();
        expect(mockaddTask).toHaveBeenCalledWith("Code");

    });


    it("edits task", () => {
        const mockEditTask = jest.fn().mockName("editTask");
        const mockTask={completed: true, id: 714, title: "Sleep"};
        const index=1;
        const { getByTestId } = render(
            <Task
            task={mockTask}
            index={index}
            editTask={mockEditTask}
            />
        );
        fireEvent.click(getByTestId("todo-edit-Sleep"));
        userEvent.type(getByTestId("todo-edit-input-Sleep"), "Work{enter}");
        expect(mockEditTask).toHaveBeenCalled();
        expect(mockEditTask).toHaveBeenCalledWith(mockTask.id,"Work");
    });


    it("deletes task", () => {
        const mockDelete = jest.fn().mockName("removeTask");
        const mockTask={completed: true, id: 714, title: "Sleep"};
        const index=1;
     
        // eslint-disable-next-line testing-library/render-result-naming-convention
        const todoRender = render(
            <Task
            task={mockTask}
            index={index}
            removeTask={mockDelete}
            />
        );
        fireEvent.click(todoRender.getByTestId("delete-button-Sleep"));
        expect(mockDelete).toHaveBeenCalled();
        expect(mockDelete).toHaveBeenCalledTimes(1);
    });

   
});