#ifndef DATABASE_H
#define DATABASE_H

#include <map>
#include "Datalog.h"
#include "Relation.h"
#include "Schema.h"
#include "Tuple.h"

class Database {
private:
	class Node {
		std::string name;
		std::set<std::string> successors;
		bool visited;
		int postOrderNumber;

		std::string getName() {
			return name;
		}

		void setName(std::string temp) {
			name = temp;
		}

		std::set<std::string> getSuccessors() {
			return successors;
		}

		void setSuccessors(std::set<std::string> temp) {
			successors = temp;
		}

		void addSuccessor(std::string temp) {
			successors.insert(temp);
		}

		bool isVisited() {
			return visited;
		}

		void setVisited(bool temp) {
			visited = temp;
		}

		int getPostOrderNumber() {
			return postOrderNumber;
		}

		void setPostOrderNumber(int temp) {
			postOrderNumber = temp;
		}
	};

	SchemeList schemeList;
	FactList factList;
	QueryList queryList;
	RuleList ruleList;
	std::vector<Relation*> relations;
	std::vector<Relation> answers;
	std::vector<std::string> variableList;
	std::vector<unsigned int> variableIndex;
	std::map<std::string, Node> dependencyGraph;
	Relation *emptyRelation;
	int numberOfPasses;

public:
	void run(Datalog& parser) {
		schemeList = parser.getSchemeList();
		factList = parser.getFactList();
		queryList = parser.getQueryList();
		ruleList = parser.getRuleList();
		emptyRelation = new Relation();
		emptyRelation->setName("empty");

		initializeRelations();		//Set up the relations and populate the vector
		executeRules();
		checkQueries();				//Check the queries
	}

	void initializeRelations() {
		std::vector<Scheme> schemes = schemeList.getSchemes();
		std::vector<Fact> facts = factList.getFacts();

		for(unsigned int i = 0; i < schemes.size(); i++) {
			Relation *tempRelation = new Relation();
			tempRelation->setName(schemes.at(i).getPredicateId()); //set name of relation
			tempRelation->setColumns(schemes.at(i).getParameters()); //set the schema in the relation

			for(unsigned int j = 0; j < facts.size(); j++) { //set tuples in each relation
				if(facts.at(j).getPredicateId() == tempRelation->getName()) {
					tempRelation->pushTuple(facts.at(j).getParameters());
				}
			}

			relations.push_back(tempRelation);
		}
	}

	void executeRules() {
		std::vector<Rule> rules = ruleList.getRules();
		numberOfPasses = 0;
		bool different = true;

		while(different) {
			different = false;
			for(unsigned int i = 0; i < rules.size(); i++) {
				Relation oldRelation;
				Relation newRelation;

				oldRelation = *getRelation(rules.at(i).getFirstRule().getId());
				newRelation = executeRule(rules.at(i));

				if(oldRelation.sizeOfTuples() != newRelation.relationUnionedWithSize())
					different = true;
			}

			numberOfPasses++;
		}
	}

	Relation executeRule(Rule& rule) {
		Relation newRelation;

		newRelation = *getRelation(rule.getRules().at(0).getId());

		for(unsigned int i = 0; i < rule.getRules().size(); i++) {
			Predicate predicate = rule.getRules().at(i);

			if(i == 0) {
				newRelation = checkSingleQuery(predicate);
			}
			else {
				Relation nextRelation;

				nextRelation = checkSingleQuery(predicate);
				newRelation = newRelation.relationJoin(&newRelation, &nextRelation);
			}
		}

		newRelation.ruleProject(rule.getFirstRule().getParameters());
		newRelation.renameAll(getRelation(rule.getFirstRule().getId()));
		newRelation.relationUnion(getRelation(rule.getFirstRule().getId()));

		return newRelation;
	}

	void checkQueries() {
		std::vector<Query> queries = queryList.getQueries(); 	//Get the queries

		for(unsigned int i = 0; i < queries.size(); i++) {
			Query query = queries.at(i);
			Predicate predicate = query.getPredicate();
			Relation singleQuery = checkSingleQuery(predicate);

			answers.push_back(singleQuery); 					//Push the newRelation onto the answers vector
		}
	}

	Relation checkSingleQuery(Predicate& predicate) {
			Relation newRelation;

			variableList.clear(); 								//Clear the variableList from the previous query
			variableIndex.clear(); 								//Clear the variableIndex from the previous query

			newRelation = *getRelation(predicate.getId());  			//Start the newRelation out as the old relation
			newRelation = answerRelation(newRelation, predicate); 	//Then go through the selects and projects to turn it into the newRelation

			return newRelation;
	}

	Relation& answerRelation(Relation& newRelation, Predicate& predicate) {
		for(unsigned int i = 0; i < predicate.getParameters().size(); i++) { 	//Loop through each parameter in the query
			std::string item = predicate.getParameters().at(i);
			newRelation = select(newRelation, i, item); 					//This select method is later in this class
		}

		newRelation.project(variableIndex); 					//Do a project on the newRelation

		return newRelation;
	}

	Relation* getRelation(std::string relationName) { 			//Just gets the relation asked for
		for(unsigned int i = 0; i < relations.size(); i++) {
			if(relations.at(i)->getName() == relationName)
				return relations.at(i);
		}

		return emptyRelation; 									//Returns the empty relation if empty
	}

	Relation& select(Relation& newRelation, unsigned int index, std::string item) { 	//Decides whether to do a select on a String or an Attribute
		if(item.find('\'') != std::string::npos) 				//If there is a ' in the string,
			newRelation.selectOnString(index, item);			//Then do a select on a String
		else {													//If there isn't, then do a select on an Attribute
			int varIndex = variables(variableList, item);		//Checks if we've seen this attribute before

			if(varIndex == -1) {								//If the attribute wasn't in the list,
				variableList.push_back(item);					//Push the variable onto this vector
				variableIndex.push_back(index);					//And push the index onto this vector
			}					
			else												//If it was in the list
				newRelation.selectOnAttribute(variableIndex.at(varIndex), index); 	//Do a select on the attribute

			newRelation.rename(index, item); 					//Finally, rename the attribute
		}

		return newRelation;
	}

	int variables(std::vector<std::string> variableList, std::string item) { 	//Checks if we've seen the attribute
		for(unsigned int i = 0; i < variableList.size(); i++) {
			if(variableList.at(i) == item)
				return i;
		}

		return -1;
	}

	std::string toString() {
		std::vector<Query> queries = queryList.getQueries();

		std::string temp = "";
		std::stringstream ss;
		std::string sstemp;

		ss << numberOfPasses;
		sstemp = ss.str();

		temp += "Schemes populated after ";
		temp += sstemp;
		temp += " passes through the Rules.\n";

		for(unsigned int i = 0; i < queries.size(); i++) {
			ss.str("");
			ss << answers.at(i).sizeOfTuples();
			sstemp = ss.str();

			temp += queries.at(i).toString();

			if(answers.at(i).sizeOfTuples() == 0) {
				temp += " No";

				if(i + 1 < queries.size())
					temp += "\n";
			}
			else {
				temp += " Yes(";
				temp += sstemp;
				temp += ")";

				temp += innerToString(i);		//Got too complex, so I split up the method

				if(i + 1 < queries.size())
					temp += "\n";
			}
		}

		temp += "\nDone!";

		return temp;
	}

	std::string innerToString(unsigned int index) {
		std::string temp = "";
		std::set<Tuple> tempTuples = answers.at(index).getTuples();
		std::set<Tuple>::iterator iter;

		for(iter = tempTuples.begin(); iter != tempTuples.end(); ++iter) {
			Tuple tempTuple = *iter;

			if(answers.at(index).getProjectionIndex().size() > 0) {
				temp += "\n  ";

				for(unsigned int i = 0; i < answers.at(index).getProjectionIndex().size(); i++) {
					if(i != 0)
						temp += ", ";

					temp += answers.at(index).getColumns().at(answers.at(index).getProjectionIndex().at(i));
					temp += "=";
					temp += tempTuple.getTuple().at(answers.at(index).getProjectionIndex().at(i));
				}
			}
		}

		return temp;
	}

	void deletePointers() {
		for(unsigned int i = 0; i < relations.size(); i++) {
			delete relations.at(i);
		}
		delete emptyRelation;
	}
};

#endif