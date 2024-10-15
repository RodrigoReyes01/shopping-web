
# Workify

> [!NOTE]
>A brief description of what this project does and who it's for

## Problem description
In today’s competitive and diverse job market, individuals seeking employment or new opportunities face the challenge of finding industries and roles that align with their unique interests and skills. There is a growing need for an effective tool that provides personalized job recommendations based on user preferences such as desired salary, work modality, and industry type. This tool should analyze these criteria against a comprehensive database of companies and industries, offering a curated list of jobs and industries that meet the user's expectations.

Beyond just recommendations, it is essential that the tool presents clear and intuitive visualizations, highlighting the similarity between the user’s preferences and the available market opportunities. Additionally, the application must seamlessly direct users to relevant platforms where they can explore and apply for the recommended positions with ease.



## Acceptance Criteria

- Personalized Search Engine: Users can input multiple criteria, such as desired salary, work type, and industry preference, which the app will use to generate tailored job recommendations.
- Personalized Recommendations: The app analyzes the user-provided data and compares it with industry datasets to deliver a list of suitable industries and recommended job positions.
- Similarity Display: The app generates a visual graph that illustrates the level of similarity between the user’s selected criteria and the provided recommendations.
- Redirection to Job Listings: The app includes direct links to external pages where the recommended job positions can be explored and applied for.
- Smooth User Experience: The application features a user-friendly interface that ensures seamless navigation from entering criteria to viewing recommendations.

## Use Case: Personalized Job Search

**Primary Actors:**
- **User:** An individual seeking new job opportunities or considering a career change.
- **System:** A web application for comparing jobs within various industries.

**Preconditions:**
- The user must be registered on the platform.
- The database must contain up-to-date information on industries and job opportunities.

**Main Scenario:**
1. **Login:** The user accesses the application and logs in with their account.
2. **Input Preferences:** The user fills out a form specifying their search criteria, including desired salary, work modality (remote, hybrid, in-person), industry type, geographic location, experience level, and other relevant factors.
3. **Data Processing:** The system compares the user's input with the industry and job data stored in the database.
4. **Results Generation:** The application provides a list of industries and job positions that best match the user's preferences.
5. **Similarity Visualization:** The app displays a graph showing the level of similarity between the user’s preferences and the recommended job opportunities.
6. **Opportunity Exploration:** The user can click on the recommended opportunities and is redirected to the companies' websites or job boards where they can apply directly.
7. **Final Decision:** The user explores the options, selects a job opportunity, and submits an application.
\
**Postconditions:**
- The user receives a tailored list of job opportunities that align with their criteria, with the option to further explore each recommendation.
### User Examples

1. **Juan, Software Developer**
   - **Profile:** Juan is a software developer with five years of experience. He is looking for a remote job with a minimum annual salary of $50,000 in a growing tech industry.
   - **App Usage:** Juan enters his preferences into the app. The tool suggests remote tech industry jobs, along with graphs that show the similarity between his preferences and the available positions. Juan finds a role at a startup that interests him and applies through the provided link.

2. **María, Marketing Manager**
   - **Profile:** María is a marketing manager looking to switch industries. She prefers a hybrid position in the consumer goods industry, with a minimum salary of $60,000 annually.
   - **App Usage:** María inputs her preferences, and the app recommends positions in various consumer goods companies offering hybrid work. Using the similarity graph, she can see which positions best align with her expectations. María then applies to several positions directly through the app.

These use cases illustrate how users interact with the app and how their expectations are met through personalized recommendations.
## Documentation

[Documentation Workify](https://docs.google.com/document/d/1aczHe1i6vp8QW6tMaUUsvUz5lks1y9bqNd5OMl4T_Iw/edit?usp=sharing)


## Deployment

**Inizalize App:**\
To deploy this project run

```bash
  Docker compose up
```
This will start the Docker instance container
```bash
  cd backend
  node index.js
```
This command will start the backend database
```bash
  npm start
```
here you will initialize the app and it will open the **Workify** localhost on your default browser.


## Authors

- [@RodrigoReyes01](https://github.com/RodrigoReyes01)
- [@LuisVillela](https://github.com/LuisVillela)
