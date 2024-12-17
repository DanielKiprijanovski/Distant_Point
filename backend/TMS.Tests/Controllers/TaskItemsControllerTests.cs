using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using TMS.API.Controllers;
using TMS.Data.Helper;
using TMS.Data.Models;
using TMS.Services.Interfaces;
using Xunit;

namespace TMS.Tests.Controllers
{
    public class TaskItemsControllerTests
    {
        private readonly Mock<ITaskService> _mockTaskService;
        private readonly TaskItemsController _controller;

        public TaskItemsControllerTests()
        {
            _mockTaskService = new Mock<ITaskService>();
            _controller = new TaskItemsController(_mockTaskService.Object);
        }

        // Test for GetTaskItems
        [Fact]
        public void GetTaskItems_ReturnsOkResult_WithPaginatedList()
        {
            // Arrange
            var taskItems = new PaginatedList<TaskItem>(
                new List<TaskItem>
                {
            new TaskItem { Id = 1, Title = "Test Task 1", IsCompleted = false, CreatedDate = DateTime.Now },
            new TaskItem { Id = 2, Title = "Test Task 2", IsCompleted = false, CreatedDate = DateTime.Now }
                },
                pageIndex: 1,
                totalPages: 1
            );

            _mockTaskService.Setup(service => service.GetAllTasks(1, 10, ""))
                            .Returns(taskItems);

            // Act
            var result = _controller.GetTaskItems(1, 10, "");

            // Assert
            var actionResult = Assert.IsType<ActionResult<PaginatedList<TaskItem>>>(result); // Correct type
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result); // Extract the result
            var returnValue = Assert.IsType<PaginatedList<TaskItem>>(okResult.Value);

            Assert.Equal(2, returnValue.Items.Count); // Verify the list contains 2 items
            _mockTaskService.Verify(service => service.GetAllTasks(1, 10, ""), Times.Once);
        }




        // Test for GetTaskItem
        [Fact]
        public void GetTaskItem_ReturnsOkResult_WhenTaskItemExists()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 1, Title = "Test Task", IsCompleted = false, CreatedDate = DateTime.Now };
            _mockTaskService.Setup(service => service.GetTaskById(1)).Returns(taskItem);

            // Act
            var result = _controller.GetTaskItem(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<TaskItem>>(result); // Ensure result is ActionResult<TaskItem>
            var okResult = Assert.IsType<OkObjectResult>(actionResult.Result); // Extract OkObjectResult
            var returnValue = Assert.IsType<TaskItem>(okResult.Value); // Extract the TaskItem

            Assert.Equal(1, returnValue.Id);
            Assert.Equal("Test Task", returnValue.Title);
        }


        // Test for GetTaskItem (not found)
        [Fact]
        public void GetTaskItem_ReturnsNotFound_WhenTaskItemDoesNotExist()
        {
            // Arrange
            _mockTaskService.Setup(service => service.GetTaskById(It.IsAny<int>())).Returns((TaskItem)null);

            // Act
            var result = _controller.GetTaskItem(1);

            // Assert
            var actionResult = result.Result;
            Assert.IsType<NotFoundResult>(actionResult);
            _mockTaskService.Verify(service => service.GetTaskById(1), Times.Once);
        }


        // Test for PostTaskItem (success)
        [Fact]
        public void PostTaskItem_ReturnsCreatedAtAction_WhenTaskIsCreated()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 1, Title = "New Task", IsCompleted = false, CreatedDate = DateTime.Now };
            _mockTaskService.Setup(service => service.CreateTask(taskItem));

            // Act
            var result = _controller.PostTaskItem(taskItem);

            // Assert
            var actionResult = Assert.IsType<CreatedAtActionResult>(result);
            var returnValue = Assert.IsType<TaskItem>(actionResult.Value);
            Assert.Equal(1, returnValue.Id);
            Assert.Equal("New Task", returnValue.Title);
        }

        // Test for PostTaskItem (bad request)
        [Fact]
        public void PostTaskItem_ReturnsBadRequest_WhenArgumentExceptionIsThrown()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 0, Title = "", IsCompleted = false, CreatedDate = DateTime.Now }; // Invalid data
            _mockTaskService.Setup(service => service.CreateTask(taskItem)).Throws(new ArgumentException("Invalid task"));

            // Act
            var result = _controller.PostTaskItem(taskItem);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Test for PutTaskItem (success)
        [Fact]
        public void PutTaskItem_ReturnsNoContent_WhenTaskIsUpdated()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 1, Title = "Updated Task", IsCompleted = false, CreatedDate = DateTime.Now };
            _mockTaskService.Setup(service => service.UpdateTask(taskItem));

            // Act
            var result = _controller.PutTaskItem(1, taskItem);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        // Test for PutTaskItem (bad request - ID mismatch)
        [Fact]
        public void PutTaskItem_ReturnsBadRequest_WhenIdMismatch()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 1, Title = "Updated Task", IsCompleted = false, CreatedDate = DateTime.Now };

            // Act
            var result = _controller.PutTaskItem(2, taskItem); // ID mismatch

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        // Test for PutTaskItem (not found)
        [Fact]
        public void PutTaskItem_ReturnsNotFound_WhenTaskDoesNotExist()
        {
            // Arrange
            var taskItem = new TaskItem { Id = 1, Title = "Updated Task", IsCompleted = false, CreatedDate = DateTime.Now };
            _mockTaskService.Setup(service => service.UpdateTask(taskItem)).Throws(new KeyNotFoundException("Task not found"));

            // Act
            var result = _controller.PutTaskItem(1, taskItem);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }

        // Test for DeleteTaskItem (success)
        [Fact]
        public void DeleteTaskItem_ReturnsNoContent_WhenTaskIsDeleted()
        {
            // Arrange
            _mockTaskService.Setup(service => service.DeleteTask(1));

            // Act
            var result = _controller.DeleteTaskItem(1);

            // Assert
            Assert.IsType<NoContentResult>(result);
        }

        // Test for DeleteTaskItem (not found)
        [Fact]
        public void DeleteTaskItem_ReturnsNotFound_WhenTaskDoesNotExist()
        {
            // Arrange
            _mockTaskService.Setup(service => service.DeleteTask(It.IsAny<int>())).Throws(new KeyNotFoundException("Task not found"));

            // Act
            var result = _controller.DeleteTaskItem(1);

            // Assert
            Assert.IsType<NotFoundObjectResult>(result);
        }
    }
}
