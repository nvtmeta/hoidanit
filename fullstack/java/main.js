
// function start(){
//     getCoruses(renderCourses);
//     handleCreateCourses();
//  }
 
//  starZZZt();
 
//  // tạo một function có thể dùng để đọc dữ liệu
//  function getCoruses(callback){
//      fetch(courseApis)
//      .then(function(response){
//          return response.json();
//      })
//      .then(callback)
//  }
 
//  // ham create để tạo mơis dữ liệu 
//  function createCourses(data, callback){
     
//      let options = {
//          method: 'POST',
//          headers: {
//              'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(data) // body data type must match "Content-Type" header
//           };        
//      fetch(courseApis, options)
//          .then(function(response){
//              return response.json();
//          })
//          .then(callback)
//      }
 
//  // handleCreateCourses lấy value của thẻ input và truyền vào một object tên form rồi truyền dữ liệu vào createCourses
 
//  function handleCreateCourses(){
//      let course = document.querySelector('#create');
//      course.onclick = function(){
//          let courseInput = document.querySelector('input[name="name"]').value;
//          let courseDescript = document.querySelector('input[name="Description"]').value;
//          let form = {
//              name: courseInput,
//              description: courseDescript
//          }
//          createCourses(form ,function(){
//              getCoruses(renderCourses);
//          })
//      }
 
//  }
 
//  // hàm delete 
 
//  function handleDeleteCourses(id){
//      let options = {
//          method: 'DELETE',
//          headers: {
//              'Content-Type': 'application/json'
//          }
//      }
//      fetch(courseApis + '/' + id, options)
//          .then(function(response){
//              return response.json();
//          })
//          .then(function(){
//              let courseItem = document.querySelector('.course-item-'+id);
//              console.log(courseItem);
//              if(courseItem){
//                  courseItem.remove();
//              }
//          })
//  }
 
//  // hàm sửa
 
//  function updateCourse(data, id){
//      let options = {
//          method: 'PUT',
//          headers: {
//              'Content-Type': 'application/json'
//          },
//          body: JSON.stringify(data)
//      }
//      fetch(courseApis + '/' + id, options)
//          .then(function(response){
//              return response.json();
//          })
//          .then(function(){
//              getCoruses(renderCourses);
//          })
//  }
 
//  function handleupdateCourses(id){
//      // thay đổi nút create thành nút uppdate
//      let createBtn = document.querySelector('#create');
//      createBtn.style.display = 'none';
//      let uppBTN = document.querySelector('#uppdate');
//      uppBTN.style.display = 'block';
//      // cho dữ liệu vào ô input
//      let nameCourse = document.querySelector('.course-item-'+id + ' h4').innerText;
//      let descriptionCourse = document.querySelector('.course-item-'+id + ' p').innerText; 
//      document.querySelector('input[name="name"]').value = nameCourse;
//      document.querySelector('input[name="Description"]').value = descriptionCourse;
//      // xử lý event nút update
//      uppBTN.onclick = function(){
//          let namenew = document.querySelector('input[name="name"]').value;
//          let Description = document.querySelector('input[name="Description"]').value;    
//      let formdata = {
//          name: namenew,
//          description: Description
//      }
//      updateCourse(formdata, id);
//      // xoa dữ liệu trong ô input 
//      let namenone = document.querySelector('input[name="name"]').value = '';
//      let Descriptionnone = document.querySelector('input[name="Description"]').value = ''; 
//      // chuyển đổi nút update thành nút create
//      uppBTN.style.display = 'none';
//      createBtn.style.display = 'block';
//      };
     
//  }
 
 
//  // render ra giao dien web 
//  function renderCourses(courses){
//      let course = document.querySelector('#list-courses');
//      let listCourses = courses.map(function(course){
//          return `
//          <li class ="course-item-${course.id}">
//              <h4>${course.name}</h4>
//              <p>${course.description}</p>
//              <button onclick="handleDeleteCourses(${course.id})">Xoa</button>
//              <button onclick= "handleupdateCourses(${course.id})">Sửa</button>
//          </li>
//          `
//      });
//      course.innerHTML = listCourses.join('');
//  }
const person = {
    firstName: "John",
    lastName : "Doe",
    id       : 5566,
    fullName : function() {
      return this.firstName + " " + this.lastName;
    }
  };
  console.log(person.fullName())
