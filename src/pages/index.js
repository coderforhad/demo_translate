import Head from "next/head";
import { Box, Button, Unstable_Grid2 as Grid, InputBase, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Language from "src/components/Language";
import Tesseract from "tesseract.js";
import { useState } from "react";

const Page = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState(null);
  const [language, setLanguages] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [errorLan, setErrorLan] = useState("");

  const handleChange = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setErrorMsg(null);
  };

  const handleImageText = async () => {
    if (!image) {
      console.error("Please select an image before converting to text.");
      setErrorMsg("Please select an image before converting to text.");
      // You can also display a user-friendly error message using a notification library or other means.
      return;
    }

    try {
      Tesseract.recognize(image, "eng")
        .then((res) => {
          setText(res.data.text);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLanChange = (key) => {
    setLanguages(key);
    setErrorLan(null);
  };

  const handleTranslate = async () => {
    if (!language) {
      console.error("Please Choose Language.");
      setErrorLan("Please Choose Language.");

      return;
    }

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          target_lang: language,
        }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Home | AI App</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: 5,
        }}
      >
        <Typography sx={{ m: 5 }} variant="h4">
          Image into language of choice
        </Typography>
        <InputBase sx={{ mx: 5 }} type="file" onChange={handleChange} />
        {errorMsg ? <span style={{ color: "red" }}>{errorMsg}</span> : ""}
        <Grid sx={{ display: "flex", gap: "10px", m: 5 }}>
          <Button variant={"contained"} onClick={handleImageText}>
            convert to text
          </Button>
          <Language handleLanChange={handleLanChange} />

          <Button variant={"contained"} onClick={handleTranslate}>
            Translate
          </Button>
        </Grid>
        <Grid sx={{ m: 5 }}>
          {errorLan ? <span style={{ color: "red" }}>{errorLan}</span> : ""}
        </Grid>
        <Grid sx={{ m: 5 }}>
          <strong>Image Text:</strong> {text}
        </Grid>
        <Grid sx={{ m: 5 }}>
          <strong>Translated Text:</strong> {translatedText}
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
