import Register from "./Register";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <Register referer={searchParams?.ref} />
    </>
  );
}
