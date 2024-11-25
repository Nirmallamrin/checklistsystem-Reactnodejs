import { useEffect, useState } from "react";
import axios from "axios";

const Checklist = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChecklist = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/checklist");
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching checklist:", error);
        setLoading(false);
      }
    };

    fetchChecklist();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Checklist Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rule</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.rule}</td>
              <td>{result.status ? "Passed" : "Failed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Checklist;
