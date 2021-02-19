import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

const fetchPlan = async () => {
  const res = await fetch("https://house-plan-hero-default-rtdb.firebaseio.com/houseplans.json");
  return res.json();
};

export default function ApiCall() {
  return (
  <QueryClientProvider client={queryClient}>
    <Call />
  </QueryClientProvider>
  )
}

function Call() {
  const { data, status } = useQuery('houseplans', fetchPlan);
  return (
    <div>
      {status === "error" && <p>Error loading deck</p>}
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
      <div>
        <ul>
          {data.map(houseplans => (
            <li key={houseplans.id}>{houseplans.name}</li>
          ))}
        </ul>
      </div>
      )}
    </div>
  )
}
