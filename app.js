// get element
const Post_form = document.getElementById('Post-form');
const msg = document.querySelector('.msg');
const all_post = document.querySelector('.all_post');
const Post_edite_form = document.getElementById('Post_edite_form');
const getAllPost = () => {
    let posts = readLSData('instra_post');
    
    list = '';
    if (!posts || posts.length==0 ) {
        all_post.innerHTML = 'No post found';
        return false;
    }
    posts.reverse().map((data, index) => {
        list += `
        <div class="card bg-white">
        <div class="card-header">
          <div class="admin_info sidebar">
            <div class="admin_details d-flex">
              <img src="${data.aphoto}" alt="">
              <div class="img_text">
                <span>${data.aname}</span> 
              </div>
            </div>
            <div class="profie_switch">
              
              <div class="dropdown">
                <span id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                  <a href="#"><i class="fas fa-ellipsis-h"></i></a>
                </span>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><a class="dropdown-item post_edite" data-bs-toggle="modal" post_index=${data.id} href="#post_edite_modal">Edite</a></li>
                  <li><a class="dropdown-item post_delete" post_index=${data.id} href="#">Delete</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <img style="max-width: 100%; height:auto;" src="${data.pphoto}" alt="">
        <div class="card-body">
          <div class="admin_info sidebar">
            <div class="admin_details d-flex">
              <a href=""><img onclick="document.getElementById('myImage').src='./img/ss10.png'" id="myImage"src="./img/Screenshot_52.png" alt=""></a>
              <a href=""><img src="./img/ss7.png" alt=""></a>
              <a href=""><img src="./img/ss8.png" alt=""></a>
            </div>
            <div class="profie_switch">
              <a href="#"><img src="./img/ss9.png" alt=""></a>
            </div>
          </div>
          <p>${data.pcontent}</p>
          <div class="admin_info sidebar">
            <div class="admin_details d-flex">
              <div class="img_text">
                <span class="t-bold mr-1">suraj_sharma57455</span> <span>nice</span>
              </div>
            </div>
            <div class="profie_switch coment_icon">
              <a href="#"><img src="./img/ss12.png" alt=""></a>
            </div>
          </div>
          <div class="post_date">June 22</div>
        </div>
        <div class="card-footer">
          <div class="write_comment">
            
            <div class="admin_info">
              <div class="admin_details d-flex">
                <img src="./img/ss14.png" alt="">
            <input type="text" class="coment" placeholder="Add a comment.....">
              </div>
              <div class="profie_switch">
                <a href="#">Post</a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
    })
    all_post.innerHTML = list;
}
getAllPost();
// form submit
Post_form.onsubmit = (e) => {
    e.preventDefault();

    // get data from form
    const form_data = new FormData(e.target);
  let randId = Math.floor(Math.random() * 1000) + '_' + Date.now();
    const data = Object.fromEntries(form_data.entries());
  const { aname, aphoto, pcontent, pphoto } = Object.fromEntries(form_data.entries());
  
    // form validation
    if (!aname || !aphoto || !pcontent ) {
        msg.innerHTML= setAlert('All fields are required')
    } else {
      createLSdata('instra_post', { ...data, id:randId });
        e.target.reset();
      getAllPost();
      
    }
    

}
// post edite
getAllPost();
// instagram post delete
all_post.onclick = (e)=>{
  e.preventDefault();
  if (e.target.classList.contains('post_delete')) {
    let post_id = e.target.getAttribute('post_index');
    let full_post = readLSData('instra_post');
    let deleted_data = full_post.filter(data=> data.id !== post_id);
    updateLsdata('instra_post', deleted_data);
    getAllPost();
    

  }
  if (e.target.classList.contains('post_edite')) {
    let post_id = e.target.getAttribute('post_index');
    let full_post = readLSData('instra_post');
    let {aname, aphoto, pcontent, id, pphoto} = full_post.find(data => data.id == post_id)
    let edit_post = full_post.find(data => data.id == post_id);

        Post_edite_form.innerHTML = `
        <div class="my-3">
        <label for="">Author name</label>
        <input name="aname" type="text" value='${aname}' class="form-control">
        <input name="id" type="hidden" value='${id}' class="form-control">
    </div>
    <div class="my-3">
        <label for="">Author photo</label>
        <input name="aphoto" type="text" value='${aphoto}'  class="form-control">
    </div>
    <div class="my-3">
        <label for="">Post Content</label>
        <input name="pcontent" type="text" value='${pcontent}'  class="form-control">
    </div>

    <div class="my-3">
      <img style="    height: 288px; width: 465px; text-align: center;object-fit: cover;" src="${pphoto}" alt="">
        <label for=""> Post Photo</label>
        <input name="pphoto" type="text" value='${pphoto}'  class="form-control">
    </div>
    <div class="my-3">
        <input type="submit" class="w-100 btn-primary btn" value="Edite Post">
    </div>
    `
  }
}

// Update edit form which show that in front side

Post_edite_form.onsubmit = (e) => {
  e.preventDefault();
  let form_data = new FormData(e.target);
  let data = Object.fromEntries(form_data.entries());
  let { aname, aphoto, id, pcontent, pphoto } = Object.fromEntries(form_data.entries());
  
  let full_post = readLSData('instra_post');
  let indexid = full_post.findIndex(data => data.id == id);
  full_post[indexid] = { aname, aphoto, id, pcontent, pphoto };
  updateLsdata('instra_post', full_post);
  getAllPost();
  
}