import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { Modal, Box, Button, Card } from "@mui/material";

const RepoItem = (data) => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commitHistory, setCommitHistory] = useState(null);
  const repo = data.repo;
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_KEY,
  });

  const formatCommitHistory = (data) => {
    const list = data.map((commit, key) => (
      <ul className="rounded bg-slate-700 text-white" key={key}>
        Author: {commit.author.login}
        <br />
        Date Created: {commit.commit.author.date}
        <br />
        Hash: {commit.sha}
        <br />
        Commit Message: {commit.commit.message}
        <br />
        <br />
      </ul>
    ));

    console.log(list);

    return <li className="h-5/6 overflow-scroll">{list}</li>;
  };

  useEffect(() => {
    if (selectedRepo) {
      console.log(selectedRepo);
      octokit
        .request("GET /repos/Netflix/{selectedRepo}/commits", {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
          selectedRepo: selectedRepo,
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          const history = formatCommitHistory(response.data);
          setCommitHistory(history);
          setSelectedRepo(null);
          console.log(commitHistory);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedRepo]);

  return (
    <>
      <Card className="card">
        <h3 className="font-bold">{repo.name}</h3>
        <section>
          Stars: {repo.stargazers_count}
          <br />
          Forks: {repo.forks}
          <br />
          Date Created: {repo.created_at}
          <br />
          Language: {repo.language}
          <br />
          <br />
          {repo.description}
        </section>
        <Button
          variant="contained"
          onClick={() => {
            setOpenModal(true);
            setSelectedRepo(repo.name);
            setLoading(true);
          }}
        >
          Commit History
        </Button>
      </Card>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className="modal">
          <div className="grid grid-cols-2">
            <div>Test</div>
            <Button variant="contained" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </div>
          {loading ? "loading..." : commitHistory}
        </Box>
      </Modal>
    </>
  );
};

export default RepoItem;
