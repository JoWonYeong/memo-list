// localStorage.clear();
const memoBtn = document.querySelector('.memo-btn');
const main = document.querySelector('.main');
let memos = JSON.parse(localStorage.getItem('memo'));
memos = memos ?? [];

// 메모버튼 클릭하면
// 로컬스토리지에 메모 추가
// id ++
memoBtn.addEventListener('click', function () {
  let newMemo = {};
  let memoTitle = main.querySelector('.memo-title').value;
  let memoContent = main.querySelector('.memo-content').value;
  let id = JSON.parse(localStorage.getItem('id'));
  id = id ?? 0;
  let now = new Date();

  newMemo.id = id;
  newMemo.title = memoTitle;
  newMemo.content = memoContent;
  newMemo.date = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
  memos.push(newMemo);

  setMemo();
  main.querySelector('.memo-title').value = null;
  main.querySelector('.memo-content').value = null;
  localStorage.setItem('memo', JSON.stringify(memos));
  localStorage.setItem('id', JSON.stringify(++id));
});

// 메모들 로컬스토리지에서 뚝 가져와서 붙이는 함수생성
// 페이지 로딩될 때 실행
// 메모버튼 눌럿을 때 실행
function setMemo() {
  const memo_list = main.querySelector('.memo-list');

  // 기존의 메모 제거
  while (memo_list.firstChild) {
    memo_list.firstChild.remove();
  }

  // 로컬스토리지에서 메모 가져와서 최신순으로 정렬
  for (let i = memos.length - 1; i >= 0; i--) {
    // article
    let article = document.createElement('article');
    article.setAttribute('data-id', memos[i].id);
    // h2 : title
    let title = document.createElement('h2');
    title.textContent = memos[i].title;
    // span : date
    let data = document.createElement('span');
    data.textContent = memos[i].date;
    // p : content
    let content = document.createElement('p');
    content.textContent = memos[i].content;
    // button : delteBtn
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.textContent = 'x';
    // button : edit
    let editBtn = document.createElement('button');
    editBtn.classList.add('editBtn');
    editBtn.textContent = '수정';

    article.append(title, data, content, deleteBtn, editBtn);
    memo_list.append(article);
  }

  setDeleteBtn();
  setEditBtn();
}

// 메모 삭제 버튼 누르면
// 해당메모 로컬스토리지에서 삭제됨
function setDeleteBtn() {
  let deleteBtns = main.querySelectorAll('.deleteBtn');

  deleteBtns.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      memos.forEach((a, i) => {
        if (a.id == e.target.parentNode.dataset.id) {
          memos.splice(i, 1);
          localStorage.setItem('memo', JSON.stringify(memos));
          setMemo();
          return;
        }
      });
    });
  });
}

// 메모 수정 버튼 누르면
// 해당메모 메모패드에 불러오고
function setEditBtn() {
  let editBtns = main.querySelectorAll('.editBtn');

  editBtns.forEach((a, i) => {
    a.addEventListener('click', (e) => {
      memos.forEach((a, i) => {
        if (a.id == e.target.parentNode.dataset.id) {
          main.querySelector('.memo-title').value = a.title;
          main.querySelector('.memo-content').value = a.content;
          memos.splice(i, 1);
          localStorage.setItem('memo', JSON.stringify(memos));
          setMemo();
          return;
        }
      });
    });
  });
}

// 페이지 로딩되면 로컬스토리지에서 메모들 가져옴
setMemo();
