import React from "react";

function Newcar({post, heading, submit}) {
  return (
    <div>
      <h1>New Car</h1>

      {post ? (
        <form id="editcarForm" method="post">
          <input type="text" name="Company" />
          <input type="text" name="Car Name" />
          <input type="text" name="color" />
          <input type="text" name="type" />
          <input type="value" name="speed" />
          <button type="submit">{submit}</button>
        </form>
      ) : (
        <form id="newcarForm" method="post">
          <input type="text" name="Company" placeholder="Company" required />
          <input type="text" name="Car Name" placeholder="Car Name" required />
          <input type="text" name="color" placeholder="Color" required />
          <input type="text" name="type" placeholder="Type" required />
          <input type="value" name="speed" placeholder="Top Speed" required />
          <button type="submit">{submit}</button>
        </form>
      )}
    </div>
  );
}

export default Newcar;
