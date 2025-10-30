const ApplicationForm = {
  data() {
    return {
      form: {
        firstName: '', lastName: '', username: '',
        password: '', confirm: '', email: '',
        street: '', suburb: '', postcode: '',
        mobile: '', dob: '', category: '', agree: false
      },
      errors: {},
      showTerms: false
    };
  },
  methods: {
    validate() {
      this.errors = {};
      const lettersOnly = /^[A-Za-z]+$/;
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const postcodeRx = /^\d{4}$/;
      const mobileRx = /^04\d{8}$/;
      const hasSpecial = /[\$\%\^&\*]/;

      if (!this.form.firstName || !lettersOnly.test(this.form.firstName))
        this.errors.firstName = 'Letters only (A–Z).';
      if (!this.form.lastName || !lettersOnly.test(this.form.lastName))
        this.errors.lastName = 'Letters only (A–Z).';
      if (!this.form.username || this.form.username.length < 3)
        this.errors.username = 'Min 3 characters.';
      if (!this.form.password || this.form.password.length < 8 || !hasSpecial.test(this.form.password))
        this.errors.password = 'Min 8 chars and include one of $, %, ^, &, *.';
      if (this.form.confirm !== this.form.password)
        this.errors.confirm = 'Passwords must match.';
      if (!emailRx.test(this.form.email))
        this.errors.email = 'Invalid email format.';
      if (this.form.street && this.form.street.length > 40)
        this.errors.street = 'Max 40 characters.';
      if (this.form.suburb && this.form.suburb.length > 20)
        this.errors.suburb = 'Max 20 characters.';
      if (!postcodeRx.test(this.form.postcode))
        this.errors.postcode = 'Postcode must be exactly 4 digits.';
      if (!mobileRx.test(this.form.mobile))
        this.errors.mobile = 'Mobile must start with 04 and be 10 digits total.';

      const dobDate = this.form.dob ? new Date(this.form.dob) : null;
      if (!dobDate || Number.isNaN(dobDate.getTime())) {
        this.errors.dob = 'Please select a valid date.';
      } else {
        const now = new Date();
        const ageYears = (now - dobDate) / 31557600000;
        if (ageYears < 16) this.errors.dob = 'Applicant must be at least 16 years old.';
      }

      if (!this.form.category) this.errors.category = 'Please select a category.';
      return Object.keys(this.errors).length === 0;
    },
    onSubmit(e) {
      if (!this.validate()) {
        e.preventDefault();
        const firstKey = Object.keys(this.errors)[0];
        if (firstKey) {
          const el = this.$el.querySelector(`#${firstKey}`);
          if (el) el.focus();
        }
      }
    }
  },
  template: `
    <div class="container py-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <h2 class="h4 mb-3">Job Application</h2>

        <form method="post"
              action="http://mercury.swin.edu.au/it000000/formtest.php"
              @submit="onSubmit">

          <!-- First / Last name -->
          <div class="row g-3">
            <div class="col-md-6">
              <label for="firstName" class="form-label">First Name</label>
              <input type="text" id="firstName" name="firstName"
                     class="form-control" :class="{'is-invalid': errors.firstName}"
                     v-model="form.firstName" />
              <div class="invalid-feedback" v-if="errors.firstName">{{ errors.firstName }}</div>
            </div>
            <div class="col-md-6">
              <label for="lastName" class="form-label">Last Name</label>
              <input type="text" id="lastName" name="lastName"
                     class="form-control" :class="{'is-invalid': errors.lastName}"
                     v-model="form.lastName" />
              <div class="invalid-feedback" v-if="errors.lastName">{{ errors.lastName }}</div>
            </div>
          </div>

          <!-- Username -->
          <div class="mt-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" id="username" name="username"
                   class="form-control" :class="{'is-invalid': errors.username}"
                   v-model="form.username" />
            <div class="invalid-feedback" v-if="errors.username">{{ errors.username }}</div>
          </div>

          <!-- Password / Confirm -->
          <div class="row g-3 mt-1">
            <div class="col-md-6">
              <label for="password" class="form-label">Password</label>
              <input type="password" id="password" name="password"
                     class="form-control" :class="{'is-invalid': errors.password}"
                     v-model="form.password" />
              <div class="invalid-feedback" v-if="errors.password">{{ errors.password }}</div>
            </div>
            <div class="col-md-6">
              <label for="confirm" class="form-label">Confirm Password</label>
              <input type="password" id="confirm" name="confirm"
                     class="form-control" :class="{'is-invalid': errors.confirm}"
                     v-model="form.confirm" />
              <div class="invalid-feedback" v-if="errors.confirm">{{ errors.confirm }}</div>
            </div>
          </div>

          <!-- Email -->
          <div class="mt-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" id="email" name="email"
                   class="form-control" :class="{'is-invalid': errors.email}"
                   v-model="form.email" />
            <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
          </div>

          <!-- Street / Suburb -->
          <div class="row g-3 mt-1">
            <div class="col-md-8">
              <label for="street" class="form-label">Street Address</label>
              <input type="text" id="street" name="street"
                     class="form-control" :class="{'is-invalid': errors.street}"
                     v-model="form.street" />
              <div class="invalid-feedback" v-if="errors.street">{{ errors.street }}</div>
            </div>
            <div class="col-md-4">
              <label for="suburb" class="form-label">Suburb</label>
              <input type="text" id="suburb" name="suburb"
                     class="form-control" :class="{'is-invalid': errors.suburb}"
                     v-model="form.suburb" />
              <div class="invalid-feedback" v-if="errors.suburb">{{ errors.suburb }}</div>
            </div>
          </div>

          <!-- Postcode / Mobile -->
          <div class="row g-3 mt-1">
            <div class="col-md-4">
              <label for="postcode" class="form-label">Postcode</label>
              <input type="text" id="postcode" name="postcode"
                     class="form-control" :class="{'is-invalid': errors.postcode}"
                     v-model="form.postcode" />
              <div class="invalid-feedback" v-if="errors.postcode">{{ errors.postcode }}</div>
            </div>
            <div class="col-md-8">
              <label for="mobile" class="form-label">Mobile</label>
              <input type="text" id="mobile" name="mobile" placeholder="04xxxxxxxx"
                     class="form-control" :class="{'is-invalid': errors.mobile}"
                     v-model="form.mobile" />
              <div class="invalid-feedback" v-if="errors.mobile">{{ errors.mobile }}</div>
            </div>
          </div>

          <!-- DOB / Category -->
          <div class="row g-3 mt-1">
            <div class="col-md-6">
              <label for="dob" class="form-label">Date of Birth</label>
              <input type="date" id="dob" name="dob"
                     class="form-control" :class="{'is-invalid': errors.dob}"
                     v-model="form.dob" />
              <div class="invalid-feedback" v-if="errors.dob">{{ errors.dob }}</div>
            </div>
            <div class="col-md-6">
              <label for="category" class="form-label">Job Category</label>
              <select id="category" name="category"
                      class="form-select" :class="{'is-invalid': errors.category}"
                      v-model="form.category">
                <option disabled value="">-- Select category --</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Data Analyst</option>
                <option>Marketing</option>
              </select>
              <div class="invalid-feedback" v-if="errors.category">{{ errors.category }}</div>
            </div>
          </div>

          <!-- Terms toggle -->
          <div class="mt-3">
            <button type="button" class="btn btn-outline-secondary"
                    @click="showTerms = !showTerms">
              Terms & Conditions
            </button>

            <div v-if="showTerms" class="alert alert-secondary mt-2 mb-0">
              <h6 class="mb-2">Terms and Conditions</h6>
              <p class="mb-2">
                Please read these terms and conditions carefully before submitting your application.
                By submitting the application form, you agree to comply with and be bound by the following terms and conditions...
              </p>

              <div class="form-check">
                <input type="checkbox" id="agree" name="agree" value="yes"
                       class="form-check-input"
                       v-model="form.agree" />
                <label class="form-check-label" for="agree">
                  I agree to the terms and conditions.
                </label>
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="mt-4">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>

        </form>
      </div>
    </div>
  </div>
  `
};

const app = Vue.createApp({});
app.component('application-form', ApplicationForm);
app.mount('#app');