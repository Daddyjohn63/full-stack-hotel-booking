import Home from '@/components/Home';
import Error from './error';

export const metadata = {
  title: 'Home Page - BookIT'
};

const getRooms = async (searchParams: string) => {
  // console.log('searchParams:', searchParams);
  const urlParams = new URLSearchParams(searchParams);
  // console.log('urlParams:', urlParams);
  const queryString = urlParams.toString();
  // console.log('queryString:', queryString);
  const res = await fetch(`${process.env.API_URL}/api/rooms?${queryString}`, {
    cache: 'no-cache' //delete later
  });
  return res.json();
};

export default async function HomePage({
  searchParams
}: {
  searchParams: string;
}) {
  const data = await getRooms(searchParams);

  if (data?.message) {
    return <Error error={data} />;
  }

  // console.log(data);
  return <Home data={data} />;
}
