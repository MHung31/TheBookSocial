import "./AddUserSearchResults.css";

function AddUserSearchResults({ user }) {
  return (
    <div className="user-search-results">
      <img className="search-avatar" src={user.avatar}/>
      <div>{user.username}</div>
    </div>
  );
}

export default AddUserSearchResults;