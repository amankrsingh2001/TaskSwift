import { Link } from 'react-router-dom'

const UserProfile = ({data}) => {
    let {href, src, linkClassName, imgClassName} = data;
    if(src == ""){
      src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGcmzEq0Xw0SrkOtsP1QY-xvlw_djsOpHBHlDlTGDdTPRunuvlteTLw6HFVVt1bptjsg&usqp=CAU';
    }
  return (
      <Link
        to={href}
        className={`inline-block h-8 w-8 rounded-[50%] bg-slate-300 relative z-0 hover:z-10 hover:scale-105 transition-all duration-300 overflow-hidden border-[2px] border-gray-700 ${linkClassName}`}
      >
        <img
          src={src}
          alt=""
          className={`w-[100%] h-[100%] object-cover ${imgClassName}`}
        />
      </Link>
  );
};

export default UserProfile;
