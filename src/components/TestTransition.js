import {
  memo,
  useCallback,
  useState,
  useEffect,
  useTransition,
  Suspense
} from "react";
import { getShoes } from "../apis/shoesApi";
import debounce from "lodash/debounce";
import ShoeSkeleton from "./ShoeSkeleton";
import { fetch } from "react-fetch";

const TestTransition = () => {
  const [textValue, setTextValue] = useState("");
  const [isPending, startTransition] = useTransition({
    timeoutMs: 3000
  });
  const [searchQuery, setSearchQuery] = useState("");

  // const debounceSearch = useCallback(
  //   debounce((nextValue) => fetchShoes(nextValue), 1000),
  //   []
  // );

  const handleSearchChange = (e) => {
    setTextValue(e.target.value);
    startTransition(() => setSearchQuery(e.target.value));
  };

  return (
    <>
      <input onChange={handleSearchChange} value={textValue} type="text" />
      <div className="container">
        <Suspense
          fallback={
            <div>
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
              <ShoeSkeleton />
            </div>
          }
        >
          <ShowList isPending={isPending} searchQuery={searchQuery} />
        </Suspense>
      </div>
    </>
  );
};

const ShowList = memo(({ searchQuery, isPending }) => {
  const [shoes, setShoes] = useState([]);

  const fetchShoes = async (value) => {
    const res = await getShoes({ search: value });
    setShoes(res?.data?.data?.result);
  };

  console.log(searchQuery);

  useEffect(() => {
    fetchShoes(searchQuery);
  }, [searchQuery]);

  return (
    <>
      {isPending ? (
        <div>Loading....</div>
      ) : (
        <div>
          {shoes.map((shoe) => (
            <div className="post" key={shoe._id}>
              <h3>{shoe.name}</h3>
              <p>{shoe.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
});

export default TestTransition;
