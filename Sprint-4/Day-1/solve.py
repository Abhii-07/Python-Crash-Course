employees = [{"name": "John","skills" : ["Python","Database"],"current_project" : None},{"name": "Emma","skills" : ["Java","Testing"],"current_project" : None},{"name": "Kelly","skills" : ["Python","Java"],"current_project" : None}]


projects = [{"name": "Project A","required_skills" : ["Python","Database"]},{"name": "Project B","required_skills" : ["Java","Testing"]},{"name": "Project C","required_skills" : ["Python","Java"]}]

def allocate_projects(employees,projects):
    projects_assign = []


    for project in projects:
        free_emp = [employee for employee in employees if project['name'] not in [projects_assign.get('project') for assign in projects_assign] and all(skill in employee['skills'] for skill in project['required_skills']) and employee['current_project'] is None]

        if free_emp:
            project_assign_emp = free_emp[0]
            projects_assign.append({'employee' : project_assign_emp['name'], 'project' : project['name']})
            project_assign_emp['current_project'] = project['name']

    return projects_assign




print(allocate_projects(employees,projects))