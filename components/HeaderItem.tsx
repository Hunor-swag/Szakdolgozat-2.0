import Link from "next/link";

type Props = {
  text: string;
  href: string;
};

function HeaderItem({ text, href }: Props) {
  return (
    <Link href={href}>
      <button className="btn">{text}</button>
    </Link>
  );
}

export default HeaderItem;
