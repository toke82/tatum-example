import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import { useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [labelText, setLabelText] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleButtonClick = async () => {

    if (!inputValue || !/^(0x)?[0-9a-fA-F]{40}$/.test(inputValue)) {
      setLabelText("Please enter a valid ETH wallet address.");
      return;
    }

    setIsLoading(true);

    const tatum = await TatumSDK.init<Ethereum>({
      network: Network.ETHEREUM,
      apiKey: { v4: import.meta.env.VITE_TATUM_API_KEY},
      verbose: true,
    });

    try {
      const balance = await tatum.address.getBalance({
        addresses: [inputValue],
      });

      const balanceData = balance.data.filter(
        (asset) => asset.asset === "ETH"
      )[0];
  
      setLabelText(balanceData ? `Balance: ${balanceData.balance}` : `No balance found or invalid address`);      
    } catch (error) {
       console.error("Error fetching balance:", error);
       setLabelText("Failed to balance");
    } finally {
      // destroy Tatum SDK - needed for stopping background jobs
      tatum.destroy();
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue((e.target as HTMLInputElement).value)}
          placeholder="Enter ETH wallet address to get balance"
          style={{ padding: "5px", width: "320px" }}
        />
      </p>
      <button onClick={handleButtonClick} style={{ padding: "5px" }} disabled={isLoading}>
      {isLoading ? "Loading..." : "Get Balance"}
      </button>
      <p style={{ padding: "5px", fontSize: "16px", fontWeight: "bold" }}>
      {labelText || (isLoading ? "Loading..." : "Waiting...")}
      </p>
    </div>
  );
}

export default Form;
