import HeaderItem from "./HeaderItem";
import Signout from "./Signout";

const Header = () => {
  return (
    <header className="flex justify-end space-x-5 p-5 border-b-2">
      <HeaderItem text="Add person" href="/admin/add-person" />
      <HeaderItem text="Exam" href="/admin/exam" />
      <HeaderItem text="Add committee" href="/admin/add-committee" />
      <HeaderItem text="Edit permissions" href="/admin/edit-permissions" />

      <Signout />
    </header>
  );
};

export default Header;
