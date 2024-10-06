import * as React from "react";
import { Hero, debounce, fetchHeroes } from "./lib";
import "./style.css";

export const App: React.FC = () => {
  const [heroQuery, setHeroQuery] = React.useState("");
  const [requestHeroQuery, setRequestHeroQuery] = React.useState("");

  const [pageQuery, setPageQuery] = React.useState("1");
  const [requestPageQuery, setRequestPageQuery] = React.useState("1");

  const [isFetching, setIsFetching] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);
  const [heroes, setHeroes] = React.useState<Hero[]>([]);

  // NOTE: with ignore
  // React.useEffect(() => {
  //   setError(null);
  //   setIsFetching(true);

  //   let ignore = false;
  //   fetchHeroes(requestHeroQuery, Number(requestPageQuery))
  //     .then((data) => {
  //       if (ignore) {
  //         return;
  //       }

  //       setError(null);
  //       if (data.results) {
  //         setHeroes(data.results);
  //       } else {
  //         setHeroes([]);
  //       }
  //     })
  //     .catch((err) => {
  //       if (!ignore) {
  //         setError(err);
  //         setHeroes([]);
  //       }
  //     })
  //     .finally(() => {
  //       if (!ignore) {
  //         setIsFetching(false);
  //       }
  //     });

  //   return () => {
  //     ignore = true;
  //   };
  // }, [requestHeroQuery, requestPageQuery]);

  // NOTE: with AbortController
  React.useEffect(() => {
    setError(null);
    setIsFetching(true);

    const abortController = new AbortController();

    fetchHeroes(requestHeroQuery, Number(requestPageQuery), {
      signal: abortController.signal,
    })
      .then((data) => {
        setError(null);
        if (data.results) {
          setHeroes(data.results);
        } else {
          setHeroes([]);
        }
        setIsFetching(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
          setHeroes([]);
          setIsFetching(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [requestHeroQuery, requestPageQuery]);

  const changeRequestHeroQueryRef = React.useRef(
    debounce(setRequestHeroQuery, 500)
  );
  const changeRequestPageQueryRef = React.useRef(
    debounce(setRequestPageQuery, 500)
  );

  const handleHeroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextHeroQuery = event.target.value;
    setHeroQuery(nextHeroQuery);
    changeRequestHeroQueryRef.current(nextHeroQuery);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextPageQuery = event.target.value;
    if (nextPageQuery === "") {
      setPageQuery("");
      changeRequestPageQueryRef.current("");
      return;
    }
    if (/^\d+$/.test(nextPageQuery)) {
      setPageQuery(nextPageQuery);
      changeRequestPageQueryRef.current(nextPageQuery);
    }
  };

  return (
    <div>
      <p>
        <label>
          Hero <input value={heroQuery} onChange={handleHeroChange} />
        </label>
      </p>
      <p>
        <label>
          Page <input value={pageQuery} onChange={handlePageChange} />
        </label>
      </p>
      {(() => {
        if (isFetching) {
          return <p>Loading...</p>;
        }
        if (error) {
          return <p>Error</p>;
        }
        if (!heroes.length) {
          return <p>No data</p>;
        }
        return (
          <ul>
            {heroes.map(({ name, url }) => (
              <li key={url}>{name}</li>
            ))}
          </ul>
        );
      })()}
    </div>
  );
};
