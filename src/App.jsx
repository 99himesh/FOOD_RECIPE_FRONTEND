import { useState } from 'react'
import  { Toaster } from 'react-hot-toast';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import AuthorsPage from './pages/AuthorsPage'
import FavouratePage from './pages/FavouratePage'
import CollectionPage from './pages/CollectionPage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import CreateRecipePage from './pages/CreateRecipePage'
import ManageYourRecipePage from './pages/ManageYourRecipePage'
import RecipeDetailsPage from './pages/RecipeDetailsPage'
import AuthorsRecipePage from './pages/AuthorsRecipePage'
import CollectionRecipesPage from './pages/colllectionReciopesPage'
import Protected from './protected/Protected'
import AdminProtected from './protected/AdminProtected';
import AdminLayout from './layout/AdminLayout';
import AdminUserPage from './pages/adminUserPage';
import AdminRecipesPage from './pages/AdminRecipesPage';
import AdminUserDetailsPage from './pages/AdminUserDetailsPage';
import AdminRecipeDetailsPage from './pages/AdminRecipeDetails';
import NotificationPage from './pages/NotificationPage';
import AdminCreateRecipePage from './pages/AdminCreateRecipePage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Toaster />

    <Routes>
      <Route>
        <Route path='/signUp' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
       <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
      <Route   path='/' element={<Protected><Layout/></Protected>} >
         <Route index element={<HomePage/>}/>
         <Route path='recipe' element={<RecipePage/>}/>
         <Route path='authors' element={<AuthorsPage/>}/>
         <Route path='favourate' element={<FavouratePage/>}/>
         <Route path='collection' element={<CollectionPage/>}/>
         <Route path='profile' element={<ProfilePage/>}/>
         <Route path='create-recipe' element={<CreateRecipePage/>}/>
         <Route path='manage-your-recipe' element={<ManageYourRecipePage/>}/>
         <Route path='recipe-details/:id' element={<RecipeDetailsPage/>}/>
         <Route path='author-recipe/:id' element={<AuthorsRecipePage/>}/>
         <Route path='collection-recipe/:id' element={<CollectionRecipesPage/>}/>
         <Route path='notification' element={<NotificationPage/>}/>
         
      </Route>
      <Route path='/admin' element={<AdminProtected><AdminLayout/></AdminProtected>}>
         <Route path='users' element={<AdminUserPage/>}/>
         <Route path='users/:id' element={<AdminUserDetailsPage/>}/>
         <Route path='recipes' element={<AdminRecipesPage/>}/>
         <Route path='recipes/:id' element={<AdminRecipeDetailsPage/>}/>
         <Route path='create-recipes' element={<AdminCreateRecipePage/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
