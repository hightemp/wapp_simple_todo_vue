                  <template v-for="(oIT, iIT) in fnGetBlockTasks(oI.id)" :key="iIT">
                    <div type="button" :class="'list-card '+(oIT.id == sSelectedTaskID ? 'active' : '')" aria-current="true">
                      <div class="actions-panel">
                        <div class="btn"><i class="bi bi-pencil"></i></div>
                      </div>

                      <div v-if="oIT.color" class="task-color" :style="{background:oIT.color}"></div>
                      <div class="title">{{oIT.name}}</div>
                      <div class="description">{{oIT.html}}</div>
                    </div>
                  </template>



