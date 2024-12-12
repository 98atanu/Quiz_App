
export const fetchCategories = async () => {
    const response = await fetch('https://opentdb.com/api_category.php')
    const data = await response.json()
    return data.trivia_categories
}

export const fetchQuestions = async (categoryId: number, difficulty: string) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`)
    const data = await response.json()
    return data.results.map((item: any) => ({
        question : item.question,
        answers: shuffle([
            ...item.incorrect_answers.map((ans: any) => ({ text: ans, isCorrect: false })),
            { text: item.correct_answer, isCorrect: true },
          ]),
        
    }))
}

const shuffle = (array : any[]) => {
    array.sort(() => Math.random() - 0.5)
}