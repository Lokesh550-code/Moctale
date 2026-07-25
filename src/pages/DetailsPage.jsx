import { useEffect, useState } from "react";
import HeroPage from "../components/DetailsPage/HeroPage";
import CastComponet from "../components/DetailsPage/CastComponet";
import GenreComponet from "../components/DetailsPage/GenreComponet";
import { mediaDetail } from "../services/media";
import ReviewComponent from "../components/DetailsPage/ReviewComponent";
import { useParams } from "react-router-dom";
import ErrorStateComponent from "../components/DetailsPage/ErrorStateComponent";

const DetailsPage = () => {
  const { mediaType, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [errorState, setErrorState] = useState(null);
  const [result, setResult] = useState(null);
  useEffect(() => {
    const api = async () => {
      try {
        setErrorState(null);
        setIsLoading(true);
        const data = await mediaDetail(mediaType, id);
        setResult(data);
      } catch (err) {
        setErrorState(err);
      } finally {
        setIsLoading(false);
      }
    };
    api();
  }, [mediaType, id]);

  if (errorState) {
    return <ErrorStateComponent />;
  }

  return (
    <div className="min-h-screen w-full mt-18 text-white">
      {<HeroPage result={result} isLoading={isLoading} />}
      {mediaType === "person" ? (
        ""
      ) : (
        <GenreComponet
          genre={result?.genres}
          origin_country={result?.origin_country}
          isLoading={isLoading}
        />
      )}
      {mediaType === "person" ? (
        ""
      ) : (
        <CastComponet
          cast={result?.credits?.cast}
          crew={result?.credits?.crew}
          isLoading={isLoading}
        />
      )}
      {mediaType === "person" ? (
        ""
      ) : (
        <ReviewComponent
          reviews={result?.reviews?.results}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default DetailsPage;
