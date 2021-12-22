import { Link, useLocation } from "react-router-dom";
import * as routes from "../../constants/routes";
import "./style.css";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../../Button";
import Input from "../../Input";

const Navigation = ({ organizationName, onOrganizationSearch }: Props) => {
  const { pathname } = useLocation();
  return (
    <header className={"Navigation"}>
      <div className={"Navigation-link"}>
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div className={"Navigation-link"}>
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>
      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
      )}
    </header>
  );
};
type Props = {
  organizationName: string;
  onOrganizationSearch: (value: string) => void;
};
const OrganizationSearch = ({
  organizationName,
  onOrganizationSearch,
}: Props) => {
  const [search, setSearch] = useState(organizationName);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    onOrganizationSearch(search);
    event.preventDefault();
  }

  return (
    <div className="Navigation-search">
      <form onSubmit={onSubmit}>
        <Input color={"white"} type="text" value={search} onChange={onChange} />{" "}
        <Button color={"white"} type="submit">
          Search
        </Button>
      </form>
    </div>
  );
};
export default Navigation;
