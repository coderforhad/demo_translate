import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { text, target_lang } = req.body;
    const key = process.env.API_KEY
    const url = process.env.URL;

    if(url && key){

      try {
        console.log("urllllllllll", url)
        console.log("keyyyyyyyyyyyyyy", key)
        const response = await axios.post(`${url}`, [{ text }], {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": `${key}`,
            "Ocp-Apim-Subscription-Region": "eastasia",
          },
          params: {
            "api-version": "3.0",
            to: target_lang,
          },
        });
  
        const translatedText = response.data[0].translations[0].text;
        res.status(200).json({ translatedText });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
