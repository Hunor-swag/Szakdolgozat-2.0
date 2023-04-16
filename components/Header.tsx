import HeaderItem from "./HeaderItem";
import Signout from "./Signout";

const Header = () => {
  return (
    <header className="flex justify-end space-x-5 p-5 border-b-2 flex-wrap-reverse">
      <HeaderItem text="Személy hozzáadása" href="/admin/add-person" />
      <HeaderItem text="Komplex vizsga" href="/admin/exam" />
      <HeaderItem
        text="Bizottsági tag hozzáadása"
        href="/admin/add-committee"
      />
      {/* <HeaderItem text="Edit permissions" href="/admin/edit-permissions" /> */}
      <HeaderItem
        text="Dokumentum generálás"
        href="/admin/generate-documents"
      />

      <Signout />
    </header>
  );
};

export default Header;
