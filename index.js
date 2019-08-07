/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */

var readLineSync = require('readline-sync');
var fs = require('fs');
var phoneBook = [];
phoneBook = JSON.parse(fs.readFileSync('./data.json'));
var option;


function showMenu(){
  console.log('======= Danh sách thao tác danh bạ =======');
  console.log('1. Nhập dữ liệu contact');
  console.log('2. Sữa dữ liệu contact');
  console.log('3. Xóa số điện thoại');
  console.log('4. Tìm kiếm');
  console.log('5. Xem danh bạ!');
  console.log('6. Ấn phím bất kì để thoát ! ');
  option = readLineSync.question('Chọn chức năng: ');
}
// thêm số phone
function insertPhoneBook(){
  
  console.log('Mời nhập tên');
  var name = readLineSync.question('Name: ');
  console.log('Mời nhập tuổi');
  var age = readLineSync.question('Age: ');
  var id = phoneBook[phoneBook.length-1].id + 1;
  var result = {
    id: id,
    name: name,
    phone: parseInt(age)
  };
  
  phoneBook.push(result);
  var saveContent = JSON.stringify(phoneBook);
  fs.writeFileSync('./data.json', saveContent , 'utf8');
  
}
// xem danh bạ
function showPhoneBook(book){
  for(let b of book){
    console.log('ID: '+b.id+'    Name: '+b.name+'     Phone Number: '+b.phone);
  }
}
// sữa số phone
function editPhoneBook(){
  showPhoneBook(phoneBook);
  let editID = readLineSync.question('Chọn danh bạ cần sữa theo ID:');
  let idPhoneBook = Number(editID);
  let newName = readLineSync.question('Nhập tên người dùng mới:');
  phoneBook[editID -1].name = newName;
  let newPhoneNumber = readLineSync.question('Nhập số điện thoại mới:');
  phoneBook[editID -1].phone = newPhoneNumber;
  fs.writeFile("data.json",JSON.stringify(phoneBook),(err)=>{
    if(!err){
   console.log("Sửa liên hệ thành công");
   showMenu();
    }else{
      console.log("Có lỗi xảy ra. Vui lòng thử lại");
      
    }
  });
  
}
// xóa số phone
function deletePhoneBook(){
  showPhoneBook(phoneBook);
  var deleteID = readLineSync.question('Nhap ID can xoa: ');
  deleteID -= 1; 
  var deletedPhoneBook;
  var newPhoneBook = [];
  for(let i=0;i<phoneBook.length;i++)
  {
      if(i == deleteID)
      {
          deletedPhoneBook = phoneBook.splice(deleteID,1);
      }
  }
  
  fs.writeFileSync("data.json",JSON.stringify(phoneBook),(err)=>{
    if(!err){
      console.log("Xoa thành công");
   }else{
      console.log("Có lỗi xảy ra. Vui lòng thử lại");
      
    }
  });
  
}
// search phone
function searchPhone(){
  var s = readLineSync.question('Nhập bất kì tên hoặc số điện thoại để tìm trong danh bạ: ');
  search(phoneBook,s);
  showMenu();
}




// =================== main ==================

showMenu();

switch(option)
{
    case '1':
      insertPhoneBook();
      console.log(phoneBook);
      break;
    case '2':
      editPhoneBook();
      break;
    case '3':
      deletePhoneBook();
      break;
    case '4':
      searchPhone();
      break;
    case '5':
      showPhoneBook(phoneBook);
      break;
    case '6':
    default:
      //console.log('Nhấm phím bất kì để thoát ! ');
      break;


}


function search(ob,q){
  if(!isNaN(q)){
     q = Number(q);
     let arr = new Array();
     for(x of ob){
       if(Number(x.phone).toString().indexOf(Number(q).toString())>=0){
         
          arr.push(x);
          
       }
     }
     showPhoneBook(arr);
  }else{
    q = q.toString();
    let arr = new Array();
    for(x of ob){
      if(change_alias(x.name).toLowerCase().indexOf(change_alias(q).toLowerCase())>=0){
         arr.push(x);
      }
    }
    showPhoneBook(arr);
  }
 
}
function change_alias(alias) {
    var str = alias;
   str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.trim(); 
    return str;
}




