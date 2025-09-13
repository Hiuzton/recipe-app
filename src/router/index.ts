import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../pages/Home.vue')
const RecipeDetails = () => import('../pages/RecipeDetails.vue')
const CartPage = () => import('../pages/Cart.vue')
const Recipes = () => import('../pages/Recipes.vue')
const About = () => import('../pages/About.vue')

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/recipe/:id', name: 'recipe', component: RecipeDetails, props: true },
    { path: '/cart', name: 'cart', component: CartPage },
    { path: '/recipes', name: 'recipes', component: Recipes },
    { path: '/about', name: 'about', component: About },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
