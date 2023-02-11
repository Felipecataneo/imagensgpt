import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  
  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  })

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true)
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    setLoading(false)
    setResult(response.data.data[0].url)
  };

  return (
    <div className="app">
      <h1>Gerador de imagens por IA</h1>
      {loading ? (
        <h2> Gerando imagem ... Aguarde!</h2>
      ) : (<></>)}
      <div className="card">
        <textarea
          className="text-input"
          placeholder="Digite a descrição"
          onChange={(e) => setPrompt(e.target.value)}
          row="5"
          cols="50"
        />
        <button className="button" onClick={generateImage}>Gerar Imagem</button>
        {result.length > 0 ? (
          <img className="result-image" src={result} alt="Generated Image" />
        ) : (
          <></>
        )}
      </div>
      <p className="footer">
        OpenAI and Cataneo Enterprises
      </p>
    </div>
  )
}

export default App