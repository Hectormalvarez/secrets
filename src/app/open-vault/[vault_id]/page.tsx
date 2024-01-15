import React from "react";

const OpenVault = ({ params }: { params: { vault_id: string } }) => {
  return <div>OpenVault ID: {params.vault_id}</div>;
};

export default OpenVault;
