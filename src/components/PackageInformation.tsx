import { defineComponent } from "vue";
import pkg from "../../package.json";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <h1>
          {pkg.name}@{pkg.version}
        </h1>

        <p>{pkg.description}</p>

        <nav>
          <ul>
            <li>
              <a href="https://github.com/ztrehagem/vue-modal">GitHub</a>
            </li>
            <li>
              <a href="https://www.npmjs.com/package/@ztrehagem/vue-modal">
                npm
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  },
});
