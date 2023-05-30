import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import RepoItem from "./RepoItem";

const List = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_KEY,
  });

  const formatData = (data) => {
    const repos = data.map((repo, key) => <RepoItem repo={repo} key={key} />);

    console.log(repos);

    repos.sort(
      (a, b) => b.props.repo.stargazers_count - a.props.repo.stargazers_count
    );

    return <div className="max-h-[500px] overflow-scroll p-10">{repos}</div>;
  };

  useEffect(() => {
    octokit
      .request("GET /orgs/Netflix/repos", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        const formatted = formatData(response.data);
        setData(formatted);
      });
  }, []);

  return <>{loading ? "loading..." : data}</>;
};

export default List;
