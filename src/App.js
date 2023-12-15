import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
import { Card, CardContent, Chip, Container, Typography } from '@mui/material'

function App() {
  const [articles, setArticles] = useState([])

  const fetchArticleData = () => {
    axios.get('https://csci-5028-f2a80309a443.herokuapp.com/fetch-articles')
    .then((res) => setArticles(res.data))
  }

  const getSubjectivityChip = (subjectivityScore) => {
    if (subjectivityScore >= 0.5) {
      return (<Chip label="Objective" color="success" />)
    } else {
      return (<Chip label="Subjective" color="error" />)
    }
  }

  const getPolarityChip = (polarityScore) => {
    if (polarityScore >= 0.5) {
      return (<Chip label="Positive" color="success" />)
    } else {
      return (<Chip label="Negative" color="error" />)
    }
  }

  useEffect(() => {
    fetchArticleData()
  }, [])

  return (
    <Container style={{ marginTop: '1em' }}>
    {articles.map(article => {
      return (
        <Card style={{ marginBottom: '1em' }}>
          <CardContent>
            <a href={article.url} target="_blank" rel="noreferrer">
              <Typography variant="h5">{article.title}</Typography>
            </a>
            {getSubjectivityChip(article.subjectivity_score)}
            {getPolarityChip(article.polarity_score)}
          </CardContent>
        </Card>
      )
    })}
    </Container>
  );
}

export default App;
