
const JobDetails = {
    data() {
        return { jobList };
    },
    template: `
    <div v-if="filteredJobs.length">
      <div v-for="job in filteredJobs.slice(0,1)" :key="job.job_id">
        <h2 class="mb-3">{{ job.job_title }} ({{ job.job_id }})</h2>
        <ul class="mb-0">
          <li><strong>Company:</strong> {{ job.company }}</li>
          <li><strong>Location:</strong> {{ job.location }}</li>
          <li><strong>Category:</strong> {{ job.category }}</li>
          <li><strong>Employment Type:</strong> {{ job.employment_type }}</li>
          <li><strong>Salary Range:</strong> {{ job.salary_range }}</li>
          <li><strong>Job Level:</strong> {{ job.job_level }}</li>
          <li><strong>Required Skills:</strong> {{ job.required_skills.join(', ') }}</li>
          <li><strong>Preferred Qualifications:</strong> {{ job.preferred_qualifications.join(', ') }}</li>
          <li><strong>Description:</strong> {{ job.job_description }}</li>
          <li><strong>Application Deadline:</strong> {{ job.application_deadline }}</li>
          <li><strong>Posted Date:</strong> {{ job.posted_date }}</li>
          <li><strong>Supervisor:</strong> {{ job.supervisor }}</li>
          <li><strong>Positions Available:</strong> {{ job.positions_available }}</li>
          <li><strong>Start Date:</strong> {{ job.start_date }}</li>
          <li><strong>Tags:</strong> {{ job.tags.join(', ') }}</li>
        </ul>
      </div>
    </div>
    `,
    computed: {
        filteredJobs: function() {
            const id = this.$route.params.id;
            return this.jobList.filter(job => job.job_id === id);
        }
    }
    
};

